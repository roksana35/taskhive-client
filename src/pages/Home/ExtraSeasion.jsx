import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExtraSeasion = () => {
  const data=[
    {
      "id": "1",
      "name": "Alice Johnson",
      "photo": "https://i.ibb.co/MR1n1wz/2148339200.jpg",
      "quote": "This service exceeded my expectations. The team was professional and the quality was top-notch."
    },
    {
      "id": "2",
      "name": "Michael Brown",
      "photo": "https://i.ibb.co/jv89NhT/2150040428.jpg",
      "quote": "I had an amazing experience. The support was prompt and they really listened to my needs."
    },
    {
      "id": "3",
      "name": "Sophia Martinez",
      "photo": "https://i.ibb.co/WBhGKtG/4948.jpg",
      "quote": "Highly recommended! The process was seamless and the end result was fantastic."
    },
    {
      "id": "4",
      "name": "James Smith",
      "photo": "https://example.com/photos/james.jpg",
      "quote": "Incredible service! The team went above and beyond to ensure I was satisfied."
    },
    {
      "id": "5",
      "name": "Emily Davis",
      "photo": "https://i.ibb.co/5nz4sD3/629.jpg",
      "quote": "The attention to detail was impressive. I felt valued as a customer and the outcome was perfect."
    }
  ]
  

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
 
  return (
    <div className="w-3/4 mx-auto mb-7">
    <div className="mt-20">
    <Slider {...settings}>
        {
            data.map(d=>(
                <div key={d.id} className="md:h-[450px] rounded-xl">
                    <div className="md:h-56 rounded-t-xl flex bg-indigo-500 justify-center items-center">
                        <img src={d.photo} className="w-[150px] h-[150px] md:w-44 md:h-44 rounded-full"></img>

                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                        <p className="text-xl font font-semibold">{d.name}</p>
                        <p>{d.quote}</p>

                    </div>

                </div>
                
            ))
        }
        </Slider>

    </div>
    
</div>
  );
};

export default ExtraSeasion;