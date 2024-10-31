import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DependentDropdown = () => {
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
	const base_url = `https://www.emsifa.com/api-wilayah-indonesia/api`;

    // Fetch provinces when the component mounts
    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await axios.get(`${base_url}/provinces.json`);
            setProvinces(response.data);
        };
        fetchProvinces();
    }, [base_url]);

    // Fetch regencies based on the selected province
    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        const response = await axios.get(`${base_url}/regencies/${provinceId}.json`);
        setRegencies(response.data);
        setDistricts([]);
        setVillages([]);
    };

    // Fetch districts based on the selected regency
    const handleRegencyChange = async (e) => {
        const regencyId = e.target.value;
        setSelectedRegency(regencyId);
        const response = await axios.get(`${base_url}/districts/${regencyId}.json`);
        setDistricts(response.data);
        setVillages([]);
    };

    // Fetch villages based on the selected district
    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        const response = await axios.get(`${base_url}/villages/${districtId}.json`);
        setVillages(response.data);
    };

    return (
        <div>
            <select onChange={handleProvinceChange} defaultValue="">
                <option value="" disabled>Select Province</option>
                {provinces.map(province => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                ))}
            </select>

            <select onChange={handleRegencyChange} disabled={!selectedProvince} defaultValue="">
                <option value="" disabled>Select Regency/City</option>
                {regencies.map(regency => (
                    <option key={regency.id} value={regency.id}>{regency.name}</option>
                ))}
            </select>

            <select onChange={handleDistrictChange} disabled={!selectedRegency} defaultValue="">
                <option value="" disabled>Select District</option>
                {districts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                ))}
            </select>

            <select disabled={!selectedDistrict} defaultValue="">
                <option value="" disabled>Select Village</option>
                {villages.map(village => (
                    <option key={village.id} value={village.id}>{village.name}</option>
                ))}
            </select>
        </div>
    );
};

export default DependentDropdown;
