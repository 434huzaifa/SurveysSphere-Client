import FAQ from "./FAQ";
import Hero from "./Hero";
import Latest from "./Latest";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Latest></Latest>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;