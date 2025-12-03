import React, {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function Carrossel() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/eventos') 
      .then(response => response.json())
      .then(data => {
        setEventos(data.slice(0, 4));
      })
      .catch(error => console.error('Erro ao buscar eventos:', error));
  }, []);

  if (eventos.length === 0) {
    return (
    <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-gray-200 mb-4"></div>
      <p className="text-gray-500 font-medium">Buscando eventos...</p>
    </div>
  );
  }

  return (
    <div className="bg-white p-8 md:p-2">
      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="mySwiper"
        >
          {eventos.map((evento) => (
            <SwiperSlide key={evento.cdEvento}> 
              <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden h-full mx-3">
                <img 
                  src={evento.imagens && evento.imagens.length > 0 
                        ? evento.imagens[0] 
                        : 'https://placehold.co/600x400?text=Sem+Imagem'} 
                  alt={evento.nmEvento} 
                  className="w-full h-85 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 text-center">
                    {evento.nmEvento}
                  </h3>
                  
                  <p className="text-gray-600 mt-2 text-lg text-center">
                    {evento.dsEvento}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carrossel;