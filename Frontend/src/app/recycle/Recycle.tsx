import React from "react";
import { FiSmartphone, FiHeadphones, FiTv } from "react-icons/fi";
import { GiWashingMachine } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { MdOutlineDevicesOther } from "react-icons/md";
import Link from "next/link";

interface RecycleCardProps {
  itemName: string;
  description: string;
  recyclingProcess: string;
  specialInstructions: string;
  icon: React.ReactNode;
}

const Recycle: React.FC = () => {
  const recycleItems: RecycleCardProps[] = [
    {
      itemName: "Smartphone",
      description: "Recycle your old smartphones responsibly.",
      recyclingProcess:
        "We ensure proper dismantling and recycling of electronic components, including screens, batteries, and circuits.",
      specialInstructions:
        "Make sure to remove any personal data before recycling. Factory reset your device before handing it over.",
      icon: <FiSmartphone size={48} className="text-blue-500" />,
    },
    {
      itemName: "Laptop",
      description: "Dispose of your old laptops in an eco-friendly way.",
      recyclingProcess:
        "Our recycling process adheres to environmental standards, ensuring safe disposal of metals and batteries.",
      specialInstructions:
        "Please remove external storage devices and batteries before recycling. If unsure, ask our staff for assistance.",
      icon: <FaLaptop size={48} className="text-green-500" />,
    },
    {
      itemName: "Accessories",
      description:
        "Recycle various electronic accessories such as headphones, chargers, and cables responsibly.",
      recyclingProcess:
        "We separate and recycle different materials such as plastic, metal, and rubber for maximum efficiency.",
      specialInstructions:
        "Bundle cables together before dropping off. Small items should be placed in a sealed bag to avoid loss.",
      icon: <FiHeadphones size={48} className="text-yellow-500" />,
    },
    {
      itemName: "Television",
      description: "Environmentally friendly disposal of old televisions.",
      recyclingProcess:
        "Our process ensures the proper disposal of harmful components such as cathode ray tubes (CRTs) and LCD screens.",
      specialInstructions:
        "Bring remote controls and power cables along for proper recycling. Ensure the TV is unplugged for safety.",
      icon: <FiTv size={48} className="text-red-500" />,
    },
    {
      itemName: "Refrigerator",
      description: "Eco-conscious disposal of old refrigerators.",
      recyclingProcess:
        "Safe removal and recycling of refrigerants, compressors, and other components to reduce environmental impact.",
      specialInstructions:
        "Ensure the refrigerator is fully defrosted and cleaned before recycling. Remove any food items beforehand.",
      icon: <RiFridgeFill size={48} className="text-indigo-500" />,
    },
    {
      itemName: "Washing Machine",
      description: "Recycle your washing machine safely and efficiently.",
      recyclingProcess:
        "We dismantle old washing machines and recycle their motors, drums, and electronic circuits responsibly.",
      specialInstructions:
        "Make sure all water is drained before dropping off. Disconnect power cables properly before transport.",
      icon: <GiWashingMachine size={48} className="text-purple-500" />,
    },
    {
      itemName: "Other",
      description: "Responsible recycling of any other electronic devices.",
      recyclingProcess:
        "Proper dismantling and recycling of mixed metal and electronic components, ensuring minimal waste.",
      specialInstructions:
        "Ensure the device is not functional before recycling. Provide details if it contains hazardous materials.",
      icon: <MdOutlineDevicesOther size={48} className="text-gray-500" />,
    },
  ];

  return (
    <div className="section container mx-auto p-6">
      <h2 className="text-4xl text-emerald-700 text-center md:text-left font-bold mb-6">
        Recycle Center
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recycleItems.map((item, index) => (
          <RecycleCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const RecycleCard: React.FC<RecycleCardProps> = ({
  itemName,
  description,
  recyclingProcess,
  specialInstructions,
  icon,
}) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-200">
      <div className="flex justify-center items-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-3">
        {itemName}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="text-gray-700 text-sm mb-2">
        <strong>Recycling Process:</strong> {recyclingProcess}
      </p>
      <p className="text-gray-700 text-sm mb-3">
        <strong>Instructions:</strong> {specialInstructions}
      </p>

      <Link
        href={`/recycle/${itemName.toLowerCase()}`}
        className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
      >
        Recycle Now
      </Link>
    </div>
  );
};

export default Recycle;
