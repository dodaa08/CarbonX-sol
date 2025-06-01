import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define interfaces for our data models
interface VerificationRequest {
  total_co2_offset: string;
  offset_activity_type?: string;
  project_id?: string;
  cost_per_ton?: string;
  organisation_type?: string;
  description?: string;
  country?: string;
  ngo_darpan_id?: string;
  gps_coordinates?: string;
  carbon_registry_link?: string;
}

interface VerificationResponse {
  total_co2_offset?: number;
  impact_percentage?: number;
  carbon_offset_value?: string;
  min_price?: number;
  max_price?: number;
  verification_status?: 'verified' | 'pending' | 'rejected';
  verification_notes?: string;
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json() as VerificationRequest;
    console.log('Received request body:', body);
    
    // Validate required fields
    const requiredFields: (keyof VerificationRequest)[] = ['total_co2_offset', 'offset_activity_type', 'project_id'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate numeric fields
    const totalOffset = parseFloat(body.total_co2_offset);
    if (isNaN(totalOffset) || totalOffset <= 0) {
      return NextResponse.json(
        { message: 'Total CO2 offset must be a positive number' },
        { status: 400 }
      );
    }

    // Prepare data for Gemini
    const prompt = `
      You are a carbon offset verification expert. Please analyze this project and provide verification.
      
      Project Details:
      - Total CO2 Offset: ${body.total_co2_offset} tons
      - Activity Type: ${body.offset_activity_type}
      - Project ID: ${body.project_id}
      - Cost per ton: ${body.cost_per_ton || 'Not specified'}
      - Organization Type: ${body.organisation_type}
      - Description: ${body.description}
      - Country: ${body.country}
      - NGO Darpan ID: ${body.ngo_darpan_id}
      ${body.gps_coordinates ? `- GPS Coordinates: ${body.gps_coordinates}` : ''}
      ${body.carbon_registry_link ? `- Carbon Registry Link: ${body.carbon_registry_link}` : ''}
      
      Please analyze this project and respond with a JSON object in this exact format:
      {
        "verification_status": "verified" or "pending" or "rejected",
        "impact_percentage": number between 0 and 100,
        "min_price": minimum price in USD,
        "max_price": maximum price in USD,
        "verification_notes": "detailed explanation of your verification decision"
      }
    `;

    try {
      console.log('Sending request to Gemini API...');
      
      try {
        // Get Gemini's response
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Received Gemini response:', text);
        
        // Parse Gemini's response
        let verificationData: VerificationResponse;
        try {
          const parsedData = JSON.parse(text);
          verificationData = {
            total_co2_offset: totalOffset,
            impact_percentage: parsedData.impact_percentage,
            carbon_offset_value: (totalOffset * parseFloat(body.cost_per_ton || '50')).toFixed(2),
            min_price: parsedData.min_price,
            max_price: parsedData.max_price,
            verification_status: parsedData.verification_status,
            verification_notes: parsedData.verification_notes
          };
        } catch (parseError) {
          console.error('Failed to parse Gemini response:', parseError);
          throw new Error('Invalid response format');
        }

        console.log('Sending final response:', verificationData);
        return NextResponse.json(verificationData);
      } catch (geminiError) {
        console.log('Gemini API failed, using fallback calculation:', geminiError);
        
        // Fallback calculation
        const costPerTon = parseFloat(body.cost_per_ton || '50');
        const basePrice = totalOffset * costPerTon;
        
        // Simple impact calculation based on total offset
        const impactPercentage = Math.min(100, Math.max(0, (totalOffset / 1000) * 100));
        
        // Price range calculation
        const minPrice = basePrice * 0.8; // 20% below base price
        const maxPrice = basePrice * 1.2; // 20% above base price
        
        const fallbackResponse: VerificationResponse = {
          total_co2_offset: totalOffset,
          impact_percentage: impactPercentage,
          carbon_offset_value: basePrice.toFixed(2),
          min_price: minPrice,
          max_price: maxPrice,
          verification_status: 'pending',
          verification_notes: 'Using automated calculation due to verification service unavailability. Please verify manually.'
        };

        console.log('Sending fallback response:', fallbackResponse);
        return NextResponse.json(fallbackResponse);
      }
    } catch (error) {
      console.error('Verification error:', error);
      return NextResponse.json(
        { message: 'Internal server error: ' + (error as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 