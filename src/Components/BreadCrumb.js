import React from 'react'

// Component Styles
import '../Styles/Css/BreadCrumb.css'

const BreadCrumb = (props) => {

    if (props.categories) {
        return (
            <div className="breadcrumb">
              {props.categories.map((cat, index) => {
                return <span key={index}> {cat.name} | </span>
              })}
            </div>
        )
    }
    
}

export default BreadCrumb