import React,{useState} from 'react';
import { QrCode } from 'lucide-react';

const SocialMedias = () => {
    const [socailImages, setSocailImages] = useState(["twitter","telegram","facebook","instagram","youtube","whatsapp"]);
    return (
        <div className='w-full  rounded py-4'>
            <h2 className='flex items-center gap-1.5 text-black/90 text-lg mb-8'>
            <QrCode className='text-blue-950' size={22} />
            با ما در سایر پلتفرم‌ها با خبر باشید</h2>
            <ul className='flex flex-wrap gap-y-3'>
                {socailImages.map((imgName) => (
                    
                    <li className='w-1/3 hover:-translate-y-1.5 transition duration-300 ease-in-out'><a href={`#${imgName}`}><img src={`../src/assets/images/socials/${imgName}.png`} className='w-2/3 mx-auto' alt={imgName} /></a></li>
                ))}
                
            </ul>
        </div>
    );
}

export default SocialMedias;
