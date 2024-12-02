import Image from 'next/image';
// app/page.tsx
export default function Home() {
  return (
    <div className="welcome">
      Welcome to the Crime Dashboard
      <div className="des">
        Explore crime data subsets using the navigation links above. Click on
        the categories to view specific crime data.
      </div>
      <Image 
        src="/images/home_lol.png" 
        alt="A description of the image" 
        width={1000} 
        height={700} 
        style={{ marginTop: "75px",color: "#fff", borderStyle: "solid", borderWidth: "3px", borderColor: "grey", display: 'flex', justifySelf: "center"}}
      />
    </div>
  );
}