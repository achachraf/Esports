import React from "react";
import moment from "moment"
import {Link} from 'react-router-dom'

export const SerieItem = ({ fullName, beginAt, winnerId }) => {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-lg-6 mt-2 mb-2">
          <div className="card">
            <div className="card-header h3">{fullName}</div>
            <div className="card-body text-center">
              <h5>
                From:{" "}
                {
                 moment(beginAt).format("DD/MM/yyy hh:mm:ss")
                }
              </h5>
              <br></br>
              {winnerId && (
                <Link to={`/teams/${winnerId}`} className="btn btn-outline-warning">
                  <i class="fas fa-trophy"></i>{'  '}
                  Winner
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
