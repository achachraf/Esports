import React from "react";
import {Link} from 'react-router-dom'

export const TeamItem = ({name,image,id}) => {
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6 mt-2 mb-2">
          <div className="card">
            <div className="card-header h3">{name}</div>
            <div className="card-body text-center">
              <img
                src={
                  image
                    ? image
                    : "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                }
                alt=""
                className="img-fluid mb-3"
                style={{ maxHeight: 200 }}
              />
              <br></br>
              <Link to={`teams/${id}`} className="btn btn-outline-primary">
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
