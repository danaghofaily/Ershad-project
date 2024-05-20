'use client'
import ContactForm from "@/components/ContactForm";
import Guides from "@/components/Guides";
import HeroSection from "@/components/HeroSection";
import PlanningService from "@/components/PlanningService";
import Travels from "@/components/Travels";
import Trips from "@/components/Trips";
import Image from "next/image";
import UserContext from "../../UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { usePathname } from 'next/navigation';

export default function Home() {
  const {username, setUsername} = useContext(UserContext);
  const {touristid, setTouristId} = useContext(UserContext);
  const {touristGuideId, setTouristGuideId} = useContext(UserContext);
  const pathname = usePathname(); // Access the pathname

  const pathSegments = pathname.split('/'); // Split pathname to get segments
  const type = pathSegments[2];

  const getTourist = async() =>{
    try {
      const response = await axios.get(`http://localhost:3019/api/tourists/user/${username}`);
      if (response.status === 200) {
        
        setTouristId(response.data._id);
        console.log("Tourist: "+response.data._id);
        return response.data; // Assuming the response contains event details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching tourist details:', error);
      // Handle error
    }
  };

  const getTourGuide = async() =>{
    try {
      const response = await axios.get(`http://localhost:3019/api/tourguides/user/${username}`);
      if (response.status === 200) {
        
        setTouristGuideId(response.data._id);
        console.log("Tourist Guide: "+response.data._id);
        return response.data; // Assuming the response contains event details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching tourist details:', error);
      // Handle error
    }
  };

  useEffect(() =>{
    getTourist();
    getTourGuide();
  }, [username]);

  return (
    <main className="flex min-h-screen flex-col gap-32 items-center overflow-hidden">
      <HeroSection />
      <PlanningService />
      <Trips />
      <Guides />
      <Travels />
      <ContactForm />
    </main>
  );
}
