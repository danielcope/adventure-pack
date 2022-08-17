import React from "react";

import "./ConfirmDelete.css";

const ConfirmDelete = () => {
  return (
    <section>
      <section className="confirm-delete-card">
        <div className="confirm-delete">
          <h3>Click delete to confirm</h3>

          <section className="button-container">
            <button>Delete</button>
            <button>Cancel</button>
          </section>
        </div>
      </section>
      <div className="blur-background"></div>
    </section>
  );
};

export default ConfirmDelete;
