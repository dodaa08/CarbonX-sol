"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://awrinqgwilgonncszdzf.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize Supabase clien

type OrganisationType = 'Solar' | 'Wind' | 'Water' | 'Reforestation' | '';

interface FormData {
  name: string;
  country: string;
  organisation_type: OrganisationType;
  carbon_offset: string;
  wallet_pubkey: string;
  value_of_nft: string;
  image: File | null;
  image_url: string;
  website_url: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  media_mentions: string;
  location_address: string;
  // Organization Details
  description: string;
  ngo_darpan_id: string;
  // Carbon Offset Details
  total_co2_offset: string;
  offset_activity_type: string;
  verification_certificate: File | null;
  project_id: string;
  before_images: File | null;
  after_images: File | null;
  gps_coordinates: string;
  carbon_registry_link: string;
  cost_per_ton: string;
  // NFT Details
  nft_name: string;
  nft_description: string;
  nft_attributes: {
    rarity: string;
    impact_score: string;
    verification_status: string;
  };
  nft_collection: string;
  nft_image: File | null;
  nft_image_url: string;
  nft_price: string;
  impact_percentage: string;
  carbon_offset_value: string;
}

const Register: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
    organisation_type: '',
    carbon_offset: '',
    wallet_pubkey: '',
    value_of_nft: '',
    image: null,
    image_url: '',
    website_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    media_mentions: '',
    location_address: '',
    // Organization Details
    description: '',
    ngo_darpan_id: '',
    // Carbon Offset Details
    total_co2_offset: '',
    offset_activity_type: '',
    verification_certificate: null,
    project_id: '',
    before_images: null,
    after_images: null,
    gps_coordinates: '',
    carbon_registry_link: '',
    cost_per_ton: '',
    // NFT Details
    nft_name: '',
    nft_description: '',
    nft_attributes: {
      rarity: '',
      impact_score: '',
      verification_status: ''
    },
    nft_collection: '',
    nft_image: null,
    nft_image_url: '',
    nft_price: '',
    impact_percentage: '',
    carbon_offset_value: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formStep, setFormStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<any>(null);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Check file type
      if (name === 'verification_certificate') {
        if (!file.type.match(/\.(pdf|png|jpg|jpeg)$/)) {
          setError('Please upload a PDF or image file');
          return;
        }
      } else if (name === 'before_images' || name === 'after_images') {
        if (!file.type.startsWith('image/')) {
          setError('Please upload an image file');
          return;
        }
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file
      });
      
      setError(null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (SVG, PNG, JPG, or GIF)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setFormData({
        ...formData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setError(null);
    }
  };

  const nextStep = async (): Promise<void> => {
    if (formStep === 3) {
      try {
        setIsSubmitting(true);
        setError(null);

        // Validate required fields before API call
        if (!formData.total_co2_offset || !formData.offset_activity_type || !formData.project_id) {
          throw new Error('Please fill in all required carbon offset details');
        }

        // Validate numeric fields
        const totalOffset = parseFloat(formData.total_co2_offset);
        if (isNaN(totalOffset) || totalOffset <= 0) {
          throw new Error('Total CO2 offset must be a positive number');
        }

        // Send data to verification API
        const verificationResponse = await fetch('http://localhost:3000/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            // Organization Details
            country: formData.country,
            organisation_type: formData.organisation_type,
            description: formData.description,
            ngo_darpan_id: formData.ngo_darpan_id,
            
            // Carbon Offset Details
            total_co2_offset: formData.total_co2_offset,
            offset_activity_type: formData.offset_activity_type,
            project_id: formData.project_id,
            gps_coordinates: formData.gps_coordinates,
            carbon_registry_link: formData.carbon_registry_link,
            cost_per_ton: formData.cost_per_ton,
          }),
        });

        const data = await verificationResponse.json();

        if (!verificationResponse.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        if (!data || !data.verification_status) {
          throw new Error('Invalid response from verification service');
        }

        // Set verification data and move to next step
        setVerificationData(data);
        setFormStep(4);
      } catch (error: any) {
        console.error('Verification error:', error);
        setError(error.message || 'Failed to verify carbon offset details. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormStep(formStep + 1);
    }
  };

  const prevStep = (): void => {
    setFormStep(formStep - 1);
  };

  const uploadImageToSupabase = async ()=> {
    if (!formData.image) {
      setError('No image selected');
      return null;
    }
    
    // try {
      setUploadProgress(0);
      
      // Create unique file name
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${formData.wallet_pubkey}_${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      // Upload file
      // const { error: uploadError } = await supabase.storage
      //   .from('nftimages')
      //   .upload(filePath, formData.image, {
      //     cacheControl: '3600',
      //     upsert: false,
      //   });

      // if (uploadError) {
      //   if (uploadError.message.includes('row-level security')) {
      //     throw new Error('Image upload failed: Storage permissions denied. Please contact support.');
      //   }
      //   throw uploadError;
      // }
      
      // Get public URL
      // const { data } = supabase.storage
      //   .from('nftimages')
      //   .getPublicUrl(filePath);
      
    //   if (!data?.publicUrl) {
    //     throw new Error('Failed to get public URL');
    //   }
      
    //   setUploadProgress(100);
    //   return data.publicUrl;
      
    // } catch (error: any) {
    //   console.error('Error uploading image:', error.message);
    //   setError(`Error uploading image: ${error.message}`);
    //   return null;
    // }
  };

  const saveFormDataToSupabase = async (imageUrl: string): Promise<boolean> => {
    try {
      const carbonOffset = parseFloat(formData.carbon_offset);
      const nftValue = parseFloat(formData.value_of_nft);
      
      if (isNaN(carbonOffset) || isNaN(nftValue)) {
        throw new Error('Invalid number format for carbon offset or NFT value');
      }

      // const { error } = await supabase
      //   .from('nft')
      //   .insert([
      //     {
      //       country: formData.country,
      //       organisation_type: formData.organisation_type,
      //       carbon_offset: carbonOffset,
      //       wallet_pubkey: formData.wallet_pubkey,
      //       value_of_nft: nftValue,
      //       image_url: imageUrl,
      //       created_at: new Date().toISOString()
      //     }
      //   ]);

      // if (error) {
      //   if (error.message.includes('row-level security')) {
      //     throw new Error('Data save failed: Database permissions denied. Please contact support.');
      //   }
      //   throw error;
      // }
      
      return true;
      
    } catch (error: any) {
      console.error('Error saving data:', error.message);
      setError(`Error saving data: ${error.message}`);
      return false;
    }
  };

  const calculateImpactPercentage = (): string => {
    if (!formData.total_co2_offset || !formData.cost_per_ton) return '0';
    const totalOffset = parseFloat(formData.total_co2_offset);
    const costPerTon = parseFloat(formData.cost_per_ton);
    if (isNaN(totalOffset) || isNaN(costPerTon) || costPerTon === 0) return '0';
    return ((totalOffset * costPerTon) / 100).toFixed(2);
  };

  const calculateCarbonOffsetValue = (): string => {
    if (!formData.total_co2_offset || !formData.cost_per_ton) return '0';
    const totalOffset = parseFloat(formData.total_co2_offset);
    const costPerTon = parseFloat(formData.cost_per_ton);
    if (isNaN(totalOffset) || isNaN(costPerTon)) return '0';
    return (totalOffset * costPerTon).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // First, verify the carbon offset data
      const verificationResponse = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_co2_offset: formData.total_co2_offset,
          offset_activity_type: formData.offset_activity_type,
          project_id: formData.project_id,
          cost_per_ton: formData.cost_per_ton,
          organisation_type: formData.organisation_type,
          description: formData.description,
          country: formData.country,
          ngo_darpan_id: formData.ngo_darpan_id,
          gps_coordinates: formData.gps_coordinates,
          carbon_registry_link: formData.carbon_registry_link
        }),
      });

      const data = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      if (!data || !data.verification_status) {
        throw new Error('Invalid verification response');
      }

      // Set the NFT price to the suggested price from verification
      setFormData(prev => ({
        ...prev,
        nft_price: data.min_price.toString()
      }));

      // Store verification data for summary
      setVerificationData(data);

      // Move to next step
      nextStep();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler to register NFT in Supabase
  const handleRegisterNFT = async () => {
    setError(null);
    setSuccessMessage(null);

    // 1. Upload image via API route and get URL
    let imageUrl = '';
    if (formData.nft_image) {
      imageUrl = await uploadImageViaApiRoute(formData.nft_image);
      if (!imageUrl) {
        setError('Failed to upload image');
        return;
      }
    }

    // 2. Insert NFT with image URL
    const { data, error } = await supabase
      .from('nfts')
      .insert([
        {
          wallet_address: formData.wallet_pubkey,
          name: formData.nft_name,
          price: Number(verificationData?.min_price || 0),
          image_uri: imageUrl,
        }
      ])
      .select();

    if (error) {
      setError(error.message);
    } else {
      setSuccessMessage('NFT registered successfully!');
      setTimeout(() => {
        router.push('/marketplace');
      }, 1200);
    }
  };

  const uploadNFTImageToSupabase = async () => {
    if (!formData.nft_image) return '';
    const file = formData.nft_image;
    const fileExt = file.name.split('.').pop();
    const fileName = `${formData.wallet_pubkey}_${Date.now()}.${fileExt}`;
    const filePath = `nftimages/${fileName}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('nftimages')
      .upload(filePath, file);

    if (uploadError) {
      setError('Image upload failed: ' + uploadError.message);
      return '';
    }

    // Get public URL
    const { data } = supabase.storage
      .from('nftimages')
      .getPublicUrl(filePath);

    return data?.publicUrl || '';
  };

  const uploadImageViaApiRoute = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/fileUpload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      setError('Image upload failed');
      return '';
    }

    const data = await res.json();
    return data.url; // This is the URL returned by your API route
  };

  const renderFormStep = (): React.ReactElement | null => {
    switch(formStep) {
      case 1:
        return (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
          
            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-gray-300 block mb-2">
                Name of Organisation
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400"
                placeholder="Enter name of organisation"
              />
            </div>

            <div className="relative">
              <label htmlFor="country" className="text-sm font-medium text-gray-300 block mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400"
                placeholder="Enter country"
              />
            </div>

            <div className="relative">
              <label htmlFor="description" className="text-sm font-medium text-gray-300 block mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-5 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400"
                placeholder="Enter about the organisation"
              />
            </div>

            <div className="relative">
              <label htmlFor="ngo_darpan_id" className="text-sm font-medium text-gray-300 block mb-2">
                NGO darpan id
              </label>
              <input
                type="text"
                id="ngo_darpan_id"
                name="ngo_darpan_id"
                value={formData.ngo_darpan_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400"
                placeholder="Enter NGO darpan id"
              />
            </div>

            <div className="relative">
              <label htmlFor="organisation_type" className="text-sm font-medium text-gray-300 block mb-2">
                Organisation Type
              </label>
              <select
                id="organisation_type"
                name="organisation_type"
                value={formData.organisation_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
              >
                <option value="">Select organisation type</option>
                <option value="Solar">Solar</option>
                <option value="Wind">Wind</option>
                <option value="Water">Water</option>
                <option value="Reforestation">Reforestation</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Next Step</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="relative">
              <label htmlFor="website_url" className="text-sm font-medium text-gray-300 block mb-2">
                Official Website URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="website_url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="https://your-website.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-300 block mb-2">
                Social Media Links <span className="text-red-500">*</span>
                <span className="text-sm text-gray-400 ml-2">(At least one required)</span>
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    id="twitter_url"
                    name="twitter_url"
                    value={formData.twitter_url}
                    onChange={handleChange}
                    required={!formData.facebook_url && !formData.instagram_url && !formData.linkedin_url}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                    placeholder="X/Twitter URL"
                  />
                </div>
                <div className="relative">
                  <input
                    type="url"
                    id="facebook_url"
                    name="facebook_url"
                    value={formData.facebook_url}
                    onChange={handleChange}
                    required={!formData.twitter_url && !formData.instagram_url && !formData.linkedin_url}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                    placeholder="Facebook URL"
                  />
                </div>
                <div className="relative">
                  <input
                    type="url"
                    id="instagram_url"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleChange}
                    required={!formData.twitter_url && !formData.facebook_url && !formData.linkedin_url}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                    placeholder="Instagram URL"
                  />
                </div>
                <div className="relative">
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    required={!formData.twitter_url && !formData.facebook_url && !formData.instagram_url}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                    placeholder="LinkedIn URL"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="media_mentions" className="text-sm font-medium text-gray-300 block mb-2">
                Media Mentions / Press Coverage
              </label>
              <textarea
                id="media_mentions"
                name="media_mentions"
                value={formData.media_mentions}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                placeholder="Enter URLs of media mentions or press coverage (one per line)"
                rows={4}
              />
            </div>

            <div className="relative">
              <label htmlFor="location_address" className="text-sm font-medium text-gray-300 block mb-2">
                Google Maps Location / Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="location_address"
                name="location_address"
                value={formData.location_address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                placeholder="Enter your organization's full address"
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Previous</span>
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Next Step</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            {/* Quantitative Data Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200">📊 Quantitative Data</h3>
              
              <div className="relative">
                <label htmlFor="total_co2_offset" className="text-sm font-medium text-gray-300 block mb-2">
                  Total CO₂ Offset Claimed <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="total_co2_offset"
                    name="total_co2_offset"
                    value={formData.total_co2_offset}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white pr-16"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 border-l border-gray-700">
                    metric tons
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="offset_activity_type" className="text-sm font-medium text-gray-300 block mb-2">
                  Offset Activity Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="offset_activity_type"
                  name="offset_activity_type"
                  value={formData.offset_activity_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                >
                  <option value="">Select activity type</option>
                  <option value="afforestation">Afforestation</option>
                  <option value="renewable_energy">Renewable Energy</option>
                  <option value="biochar">Biochar</option>
                  <option value="soil_carbon">Soil Carbon Sequestration</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Verification & Certification Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200">📜 Verification & Certification</h3>
              
              <div className="relative">
                <label htmlFor="verification_certificate" className="text-sm font-medium text-gray-300 block mb-2">
                  Third-party Verification Certificate <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label 
                    htmlFor="verification_certificate" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/30 border-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-300">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PDF, PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input 
                      id="verification_certificate" 
                      name="verification_certificate" 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg" 
                      className="hidden" 
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="project_id" className="text-sm font-medium text-gray-300 block mb-2">
                  Project ID / Registration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="project_id"
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Enter project ID or registration number"
                />
              </div>
            </div>

            {/* Supporting Evidence Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200">📎 Supporting Evidence</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="before_images" className="text-sm font-medium text-gray-300 block mb-2">
                    Before Project Images <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label 
                      htmlFor="before_images" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/30 border-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG (MAX. 5MB)</p>
                      </div>
                      <input 
                        id="before_images" 
                        name="before_images" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="after_images" className="text-sm font-medium text-gray-300 block mb-2">
                    After Project Images <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label 
                      htmlFor="after_images" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/30 border-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG (MAX. 5MB)</p>
                      </div>
                      <input 
                        id="after_images" 
                        name="after_images" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="gps_coordinates" className="text-sm font-medium text-gray-300 block mb-2">
                  GPS Coordinates / Map Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="gps_coordinates"
                  name="gps_coordinates"
                  value={formData.gps_coordinates}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Enter GPS coordinates or Google Maps link"
                />
              </div>

              <div className="relative">
                <label htmlFor="carbon_registry_link" className="text-sm font-medium text-gray-300 block mb-2">
                  Carbon Registry Entry Link
                </label>
                <input
                  type="url"
                  id="carbon_registry_link"
                  name="carbon_registry_link"
                  value={formData.carbon_registry_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Enter link to public carbon registry entry"
                />
              </div>
            </div>

            {/* Suggested Value Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200">💸 Suggested Value or Cost of Offset</h3>
              
              <div className="relative">
                <label htmlFor="cost_per_ton" className="text-sm font-medium text-gray-300 block mb-2">
                  Cost per ton of CO₂ offset
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="cost_per_ton"
                    name="cost_per_ton"
                    value={formData.cost_per_ton}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white pr-16"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 border-l border-gray-700">
                    USD
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Previous</span>
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Next Step</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm">
                {successMessage}
              </div>
            )}
            {/* NFT Summary Section */}
            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">📊 NFT Summary</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Carbon Offset</p>
                  <p className="text-xl font-semibold text-white">{verificationData?.total_co2_offset || '0'} tons</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Impact Percentage</p>
                  <p className="text-xl font-semibold text-green-400">{verificationData?.impact_percentage || '0'}%</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Carbon Offset Value</p>
                  <p className="text-xl font-semibold text-white">${verificationData?.carbon_offset_value || '0'}</p>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Suggested NFT Price Range</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-lg font-semibold text-white">${verificationData?.min_price || '0'}</p>
                  <span className="text-gray-400">-</span>
                  <p className="text-lg font-semibold text-white">${verificationData?.max_price || '0'}</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">Based on carbon offset value and market factors</p>
              </div>

              {verificationData?.verification_status && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Verification Status</p>
                  <p className={`text-lg font-semibold ${verificationData.verification_status === 'verified' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {verificationData.verification_status}
                  </p>
                  {verificationData.verification_notes && (
                    <p className="text-sm text-gray-400 mt-1">{verificationData.verification_notes}</p>
                  )}
                </div>
              )}
            </div>

            {/* NFT Details Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200">🎨 NFT Details</h3>
              
              <div className="relative">
                <label htmlFor="wallet_pubkey" className="text-sm font-medium text-gray-300 block mb-2">
                  Wallet Public Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="wallet_pubkey"
                  name="wallet_pubkey"
                  value={formData.wallet_pubkey}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Enter your Solana wallet public key"
                />
                <p className="mt-1 text-sm text-gray-400">This wallet will receive the NFT after minting</p>
              </div>

              <div className="relative">
                <label htmlFor="nft_name" className="text-sm font-medium text-gray-300 block mb-2">
                  NFT Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nft_name"
                  name="nft_name"
                  value={formData.nft_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Enter a unique name for your NFT"
                />
              </div>

              <div className="relative">
                <label htmlFor="nft_description" className="text-sm font-medium text-gray-300 block mb-2">
                  NFT Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="nft_description"
                  name="nft_description"
                  value={formData.nft_description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white"
                  placeholder="Describe your carbon offset project and its impact"
                />
              </div>

              <div className="relative">
                <label htmlFor="nft_price" className="text-sm font-medium text-gray-300 block mb-2">
                  NFT Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="nft_price"
                    name="nft_price"
                    value={verificationData?.min_price || '0'}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white pr-16 cursor-not-allowed"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 border-l border-gray-700">
                    USD
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Price is set based on verification results
                </p>
              </div>

              <div className="relative">
                <label htmlFor="nft_image" className="text-sm font-medium text-gray-300 block mb-2">
                  NFT Image <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label 
                    htmlFor="nft_image" 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/30 border-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-300">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input 
                      id="nft_image" 
                      name="nft_image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Previous</span>
              </button>
              <button 
                type="button" 
                onClick={handleRegisterNFT}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Register NFT</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="font-medium text-gray-300 block mb-2 text-xl mt-5 mb-5">
            *An early staged version of the platform, UI is not final yet.
          </h1>
        </div>
        <div className="flex justify-between items-center mb-8">
          {/* <h1 className="text-2xl font-bold text-white">Register Your Project</h1> */}
         
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl shadow-xl overflow-hidden">
              <div className="p-1 ">
                <div className="p-6 sm:p-8">
                
                  
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-blue-500' : 'bg-gray-700'}`}>
                          {formStep > 1 ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : (
                            <span>1</span>
                          )}
                        </div>
                        <span className="ml-2 text-sm text-gray-300">Organisation Details</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`}>
                          {formStep > 2 ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : (
                            <span>2</span>
                          )}
                        </div>
                        <span className="ml-2 text-sm text-gray-300">Online presence</span>
                      </div>

                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-blue-500' : 'bg-gray-700'}`}>
                          {formStep > 3 ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : (
                            <span>3</span>
                          )}
                        </div>
                        <span className="ml-2 text-sm text-gray-300">Carbon Offset Details</span>
                      </div>

                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 4 ? 'bg-blue-500' : 'bg-gray-700'}`}>
                          <span>4</span>
                        </div>
                        <span className="ml-2 text-sm text-gray-300">NFT Details</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-in-out" 
                        style={{ width: `${((formStep - 1) / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    {renderFormStep()}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-400 mb-4">
                  Having trouble registering your environmental project? Our team is here to help you through the process.
                </p>
                <Link 
                  href="/contact" 
                  className="block w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white text-center rounded-lg transition duration-200"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 CarbonX - All rights reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/marketplace" className="text-gray-400 hover:text-white transition duration-200">
              Marketplace
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;