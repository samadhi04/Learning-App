import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp14418137.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Foodcraft</h1>
        <p className="text-lg">
        At FoodCraft, we believe that great food brings people together. We're passionate about crafting delicious, wholesome meals made with the freshest ingredients and a touch of creativity. Whether you're craving comfort food, healthy bites, or bold flavors, FoodCraft is your go-to destination for food made with love. Our mission is simple: to serve food that not only tastes amazing but also makes you feel good.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
