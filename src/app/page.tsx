import Categories from "@/Components/Categories";
import Faq from "@/Components/Faq";
import Features from "@/Components/Feature";
import FeaturedCourses from "@/Components/getLatestCourses";
import Hero from "@/Components/HeroSection";
import Newsletter from "@/Components/Newsletter";
import Stats from "@/Components/Stats";
import Testimonials from "@/Components/Testimonials";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedCourses></FeaturedCourses>
      <Features></Features>
      <Categories></Categories>
      <Stats></Stats>
      <Testimonials></Testimonials>
      <Faq></Faq>
      <Newsletter></Newsletter>
      
    </div>
  );
}
