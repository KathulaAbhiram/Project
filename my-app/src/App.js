import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Mycal from './components/Mycal';
import Widgets from './components/Widgets';
import { IoMdAddCircle } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from "react";
import Axios from "axios";
import {BsCloudUploadFill} from 'react-icons/bs';
import {GiCancel} from 'react-icons/gi';
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {

  const [question,setQuestion]=useState('');
  const [answer,setAnswer]=useState('');
  const [image, setImage] = useState('');
  const [qslist,setQslist]=useState([
    {
      question:'Itachi',
      answer:'Sharingan',
      image:'https://th.bing.com/th/id/OIP.X9OHDlanC9uW4n5F4asv9gHaJl?w=139&h=180&c=7&r=0&o=5&pid=1.7',
    },
    {
      question:'Minato',
      answer:'Flying Raijin',
      image:'https://th.bing.com/th/id/OIP.3D4-1drKJXM3xEhJxzP_qgHaHa?w=174&h=180&c=7&r=0&o=5&pid=1.7',
    },
    {
      question:'Kakashi',
      answer:'Chidori',
      image:'https://th.bing.com/th/id/OIP.hmIC6zo6YjB9nJxNK5r4UwHaJ4?w=139&h=185&c=7&r=0&o=5&pid=1.72222222',
    },
    {
      question:'Naruto',
      answer:'Rasengan',
      image:'https://wallpapercave.com/wp/fyY4nRv.jpg',
    },
    {
      question:'Obito',
      answer:'Kamui',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWFK2KO4_J0ch3Oqqu5FPJtn9BWX-RA7uVg&usqp=CAU',
    },
    {
      question:'Pain',
      answer:'Shinra Tensei',
      image:'https://th.bing.com/th/id/OIP.WJMQlrJbQ9q75Ww_NV-O3QHaFW?w=247&h=180&c=7&r=0&o=5&pid=1.7',
    },
  ]);
  const [show, setShow] = useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm();

  //To print data of movie name and reviews in console
  //Fetch data
  useEffect(()=>{
    Axios.get('http://localhost:3001/get')
    .then((res)=>setQslist([...qslist,res.data]))
    .catch((err)=>console.log(err))
  },[]);

  const submitReview=()=>{
    setQslist([...qslist,{question:question,answer:answer,image:image}])
    Axios.post('http://localhost:3001/insert',{question:question,answer:answer,image:image})
    .then((res)=> console.log(res))
    .catch((err)=>console.log(err));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    setQuestion(data.question);
    setAnswer(data.answer);
    setImage(data.image);
    submitReview();
    setShow(false);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home qslist={qslist}/>,
        },
        {
          path: '/mycal',
          element: <Mycal />,
        },
        {
          path: '/widgets',
          element: <Widgets />,
        },
      ],
    },
  ]);

  const calculateProgress = () => {
    if (image) {return 100;}
    else if (answer) {return 70;}
    else if (question) {return 35;}
    else {return 0;}
  };
  return (
    <div className='App'>
    <RouterProvider router={router}></RouterProvider>

      

      {/*  Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title className='modal-title'>Creating a new card</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <div className='row modal-content'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
        
        <div className='mb-3 form-group'>
        <label htmlFor='question' className='form-control fw-bold fs-5'>Question</label>
        <input id='question' {...register('question', { required: true })} onChange={(e) => setQuestion(e.target.value)} />

        
        </div>
        <div className='mb-3 form-group'>
        <label htmlFor='answer' className='form-control fw-bold fs-5'>Answer</label>
        <input id='answer' {...register('answer',{required:true})} onChange={(e)=>setAnswer(e.target.value)} />
        </div>
        <div className='mb-3 form-group'>
        <label htmlFor='image' className='form-label fw-bold fs-5'>User image</label>
        <input type="text" id="image" className="form-control" {...register('image',{required:true})} onChange={(e)=>setImage(e.target.value)} />
        </div>
        <div className='text-center'>
        <Button className='btn btn-danger me-2' onClick={handleClose}><GiCancel />Cancel</Button>
        <Button type="submit"><BsCloudUploadFill />Add</Button>
        </div>      
        </form>

        <ProgressBar now={calculateProgress()} />
        </div>
        </Modal.Body>
      </Modal>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {qslist.map((val)=><div className='col text-center mx-auto' key={val.question}>
        <div className="card">          
          <h1 className="h1">{val.question}</h1>
          <h1 className="h1">{val.answer}</h1>
          <img src={val.image} alt='' className='img'/>
        </div>
        </div>
        )}
        </div>
        {/* Button */}
      <div className="btn-container">
        <button onClick={handleShow} className="btn btn-primary">
          <IoMdAddCircle style={{ marginRight: "5px" }} />Add Card
        </button>
      </div>
    </div>
  );
}

export default App;