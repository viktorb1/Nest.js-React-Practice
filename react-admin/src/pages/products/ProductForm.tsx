import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { Product } from '../../models/product';

export const ProductForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            (
                async () => {
                    // const {data} = await axios.get(`products/${props.match.params.id}`)
                    const {data} = await axios.get<Product>(`products/${id}`)
                    setTitle(data.title)
                    setDescription(data.description)
                    setImage(data.image)
                    setPrice(data.price.toString())
                }
            )();
        }

    }, [id])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const data = {
            title,
            description,
            image,
            price
        }

        if (id) {
            await axios.put(`products/${id}`, data)
        } else {
            await axios.post('products', data)
        }

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to={'/products'} />
    }

    return (
        <Layout>
            <form className="p-4" onSubmit={submit}>
                <div className="mb-3">
                    <TextField label="Title" onChange={e => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="mb-3">
                    <TextField label="Description" rows={5} multiline onChange={e => setDescription(e.target.value)} value={description}/>
                </div>
                <div className="mb-3">
                    <TextField label="Image"  onChange={e => setImage(e.target.value)} value={image}/>
                </div>
                <div className="mb-3">
                    <TextField label="Price" type="number"  onChange={e => setPrice(e.target.value)} value={price}/>
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Layout>
    );
};
