import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import EditContact from "./EditContact";

class Contact extends Component {
  state = {
    showContactInfo: false,
    showEditContact: false
  };

  expandContact = e => {
    if (!this.state.showEditContact)
      this.setState({ showContactInfo: !this.state.showContactInfo });
  };
  editContact = e => {
    this.setState({ showEditContact: !this.state.showEditContact });
    this.setState({ showContactInfo: false });
  };
  deleteContact = (id, dispatch) => {
    dispatch({
      type: "DELETE_CONTACT",
      payload: id
    });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo, showEditContact } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-1">
              <h4>
                {name}{" "}
                <i
                  className="fas fa-times  float-sm-right"
                  onClick={this.deleteContact.bind(this, id, dispatch)}
                  style={{ cursor: "pointer", color: "red" }}
                />
                <i
                  className="fas fa-pencil-alt col-1 float-sm-right"
                  onClick={this.editContact}
                  style={{ cursor: "pointer" }}
                />
                {showContactInfo ? (
                  <i
                    onClick={this.expandContact}
                    className="fas fa-sort-up col-1 float-sm-right"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <i
                    onClick={this.expandContact}
                    className="fas fa-sort-down col-1 float-sm-right"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}

              {showEditContact ? (
                <EditContact
                  contact={this.props.contact}
                  editContact={this.editContact}
                />
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
