import React, { useContext, useState } from 'react';
import PropertyContext from '../context/Property/PropertyContext';
import { useNavigate } from 'react-router-dom';
import './CreateResidencies.css';

const CreateResidencies = () => {
    const context = useContext(PropertyContext);
    const { addProperty } = context;
    const history = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            images: Array.from(e.target.files)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            history("/login");
            return;
        }
        try {
            const res = await addProperty(formData);
            console.log("Property added successfully:", res);
            history("/");
        } catch (err) {
            console.error("Error adding Property:", err);
        }
    };

    return (
        <div className="container create-property-container">
            <h2 className="my-2 title">List Your Property</h2>
            <form className="property-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Property Title" 
                    value={formData.title} 
                    onChange={handleChange}
                    className="input-field"
                />
                <textarea 
                    name="description" 
                    placeholder="Property Description" 
                    value={formData.description} 
                    onChange={handleChange}
                    className="input-field textarea"
                />
                <input 
                    type="text" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange}
                    className="input-field"
                />
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Location" 
                    value={formData.location} 
                    onChange={handleChange}
                    className="input-field"
                />
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category (e.g. Apartment, House)" 
                    value={formData.category} 
                    onChange={handleChange}
                    className="input-field"
                />
                <input 
                    type="file" 
                    name="images" 
                    multiple 
                    placeholder="Upload Images" 
                    onChange={handleImageChange}
                    className="input-file"
                />
                <button className="btn-submit" type="submit">Create Property</button>
            </form>
        </div>
    );
};

export default CreateResidencies;
