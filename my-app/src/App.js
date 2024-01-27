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
      question:'Waterpipe Leakage',
      answer:'Road no:10,Near Hanuman Temple',
      image:'https://cabalinspections.com/wp-content/uploads/2019/09/plumbing-leak-old-pipes-1080x675.jpg.webp',
      clicked:false,
    },
    {
      question:'Drainage Overflow',
      answer:'Road no:5,Lane no-1',
      image:'https://media.istockphoto.com/id/1185270091/video/water-pipe-breakthrough-water-splashes-out-of-the-pipe-strong-pressure-of-water.jpg?s=640x640&k=20&c=MtfBL12JSApOv_lLY0ug3TNkeD73q8yp7fQpSeNom2w=',
      clicked:false,
    },
    {
      question:'Food Wastage',
      answer:'Road no:5,Near Lakshmi Banquet Hall',
      image:'https://umaine.edu/sustainability/wp-content/uploads/sites/162/2021/04/Treasure_trove_of_wasted_food_sm2.jpg',
      clicked:false,
    },
    {
      question:'Waste',
      answer:'Road no:7',
      image:'https://scontent.fhyd10-1.fna.fbcdn.net/v/t1.6435-9/121029707_1546035565581722_562656835059319273_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9b3078&_nc_ohc=9WyKPTlEZPMAX87f-gw&_nc_ht=scontent.fhyd10-1.fna&oh=00_AfBdM-W5RFViLgA3jJFHGNLa-1jGfhDnvYy9Do01bQ29nw&oe=65B27029',
      clicked:false,
    },
    //{
      //question:'Water Blockage',
      //answer:'Road no:1,Lane no-6',
      //image:'https://www.researchgate.net/profile/David-Ogbonna/publication/329895885/figure/fig1/AS:718508606361601@1548317209535/Blockage-of-drainage-channel-with-plastics-and-other-materials-to-stop-free-flow-of-water.jpg',
      //clicked:false,
    //},
    {
      question:'Free Food',
      answer:'Road no:15,Raja Function Hall',
      image:'https://samaroh.in/wp-content/uploads/2017/12/B5I1.jpg',
      clicked:false,
    },
  ]);
  const handleButtonClick = (index) => {
    const updatedList = [...qslist];
    updatedList[index].clicked = !updatedList[index].clicked; // Toggle clicked property
    setQslist(updatedList);
  };
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
          <Modal.Title className='modal-title'>Add problem status</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <div className='row modal-content'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>        
        <div className='mb-3 form-group'>
        <label htmlFor='question' className='form-control fw-bold fs-5'>Problem</label>
        <input id='question' {...register('question', { required: true })} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div className='mb-3 form-group'>
        <label htmlFor='answer' className='form-control fw-bold fs-5'>Location</label>
        <input id='answer' {...register('answer',{required:true})} onChange={(e)=>setAnswer(e.target.value)} />
        </div>
        <div className='mb-3 form-group'>
        <label htmlFor='image' className='form-label fw-bold fs-5'>Image</label>
        <input type="text" id="image" className="form-control" {...register('image',{required:true})} onChange={(e)=>setImage(e.target.value)} />
        </div>
        <div className='text-center'>
        <Button className='btn btn-danger me-2' onClick={handleClose}><GiCancel />Cancel</Button>
        <Button type="submit"><BsCloudUploadFill />Add Problem</Button>
        </div>      
        </form>

        <ProgressBar now={calculateProgress()} />
        </div>
        </Modal.Body>
      </Modal>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {qslist.map((val,index)=><div className='col text-center mx-auto' key={val.question}>
        <div className="card">          
          <h1 className="h1">{val.question}</h1>
          <h1 className="h1">{val.answer}</h1>
          <img src={val.image} alt='' className='img'/>
          <button style={{backgroundColor: val.clicked ? 'green' : 'transparent',}}onClick={() => handleButtonClick(index)}>{val.clicked ? 'Done' : 'Click Me'}</button>
        </div>
        </div>
        )}
        </div>
        {/* Button */}
      <div className="btn-container">
        <button onClick={handleShow} className="btn btn-primary">
          <IoMdAddCircle style={{ marginRight: "5px" }} />Add Problem
        </button>
      </div>
    </div>
  );
}

export default App;
