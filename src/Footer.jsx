import { Footer } from 'flowbite-react';
const Footer2 = () => {
    return (
        <div className='mx-10'>
        <Footer container>
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <Footer.Brand
                        href="/"
                        src="/survey.png"
                        alt="Logo"
                        name="SurveySphere"
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="#">About</Footer.Link>
                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                        <Footer.Link href="#">Licensing</Footer.Link>
                        <Footer.Link href="#">Contact</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright href="#" by="SurveySphere" year={2024} />
            </div>
        </Footer>
        </div>
    );
};

export default Footer2;