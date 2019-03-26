import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Document, Page } from 'react-pdf';

const pdf = (props) => (
        <div>
            <embed src={props.url} type="application/pdf" width='500px' height="500px"/>
        </div> 
)

export default pdf