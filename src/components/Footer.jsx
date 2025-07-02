import React,{useState} from 'react';


const Footer = ({width = 'full'}) => {
  const [socailImages, setSocailImages] = useState(["twitter","telegram","facebook","youtube","whatsapp","instagram"]);
   return(
    <footer className={`w-${width} bg-blue-900 text-white py-5 mt-3`}>
    <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4">
      <div className="w-full flex justify-around">
        <div className="w-60 flex flex-wrap gap-4">
        <a href="#" className="w-18 opacity-70 hover:opacity-100 transition">خانه</a>
        <a href="#" className="w-18 opacity-70 hover:opacity-100 transition">درباره ما</a>
        <a href="#" className="w-18 opacity-70 hover:opacity-100 transition">ایمیل</a>
        <a href="#" className="w-18 opacity-70 hover:opacity-100 transition">تماس با ما</a>
      </div>
     
      <div className="flex">
        <ul className='flex flex-wrap gap-2'>
                {socailImages.map((imgName) => (
                    
                    <li className='w-1/4 opacity-70 hover:opacity-100'><a href={`#${imgName}`}><img src={`../src/assets/images/socials/${imgName}.png`} className='w-8 mx-auto' alt={imgName} /></a></li>
                ))}
        </ul>
      </div>
      </div>
      

      <div className="text-center md:text-right text-sm cursor-default select-none ">
        © {new Date().getFullYear()} عرفان نیوز | تمامی حقوق محفوظ است.
      </div>
    </div>
  </footer>
   ) 
  }
;

export default Footer;