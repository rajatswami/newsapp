import React from 'react';

const NewsItem =(props)=>  {
  

 

    let { title, description, imageUrl, newsUrl,author,date,source } = props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://static.politico.com/1b/cf/8febd3bb4d069e132c272079db9f/israel-palestinians-06588.jpg":imageUrl} alt={title || "News image"} />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}
  
    </span></h5>
        
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">by{!author?"unknown":author} on {new Date(date).toGMTString()}    </small></p>

            <a rel="noreferrer" href={newsUrl}target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>





      </div>
    );
  }


export default NewsItem;
