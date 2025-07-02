
import Advertisings from '../Advertisings';
import Footer from '../Footer';
import RecentNews from '../RecentNews';
import SinglePostContent from '../SinglePostContent';
import SocialMedias from './SocialMedias';


export default function SinglePost() {
  

  return (
    <div className='w-screen flex flex-col justify-between px-4'>
      <div className='flex'>
        <div className="w-3/4 "><SinglePostContent/></div>
        <div className='w-1/4 mt-4'>
        <RecentNews/>
        <Advertisings/>
        <SocialMedias/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
