import React, { useState } from "react";
import * as yup from "yup";
import { Button, Modal, Form, Row } from "react-bootstrap";
import ExprnseRecord from "./ExpenseRecord";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { submitForm } from "../Redux/ExpenseDataSlice";
const Expense = () => {
  const dispatch = useDispatch();
  const initialState = {
    expamu: "",
    exptype: "",
    expname: "",
    expdate: "",
  };
  const validationSchema = yup.object().shape({
    expamu: yup.number().required("Expense amount is required"),
    exptype: yup.string().required("Expense type is required"),
    expname: yup.string().required("Expense amount name is required"),
    expdate: yup.string().required("Expense date is required"),
  });
  const expenseSubmit = (values, { resetForm }) => {
    dispatch(submitForm(values));
    resetForm();
    console.log("submit", values);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSave = () => {
    handleCloseModal();
  };
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button className="ms-2 mt-2" onClick={handleButtonClick}>
        Add Expense Details
      </Button>
      <Modal className="mt-5" show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Current Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={expenseSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Expence Amount</Form.Label>
                  <Form.Control
                    name="expamu"
                    type="text"
                    placeholder="Enter Expense Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expamu}
                    error={errors.expamu}
                    autoFocus
                  />
                  <Row>
                    {touched.expamu && errors.expamu && (
                      <small className="text-danger error_Field">
                        {errors.expamu}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Expense Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="exptype"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.exptype}
                    error={errors.exptype}
                    autoFocus
                  >
                    <option> Select Expense Type</option>
                    <option value="Exit Expense">Exit Expense</option>
                    <option value="Flexible">Flexible Expense</option>
                  </Form.Select>
                  <Row>
                    {touched.exptype && errors.exptype && (
                      <small className="text-danger error_Field">
                        {errors.exptype}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Expense Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Expense Name"
                    name="expname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expname}
                    error={errors.expname}
                    autoFocus
                  />
                  <Row>
                    {touched.expname && errors.expname && (
                      <small className="text-danger error_Field">
                        {errors.expname}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Date"
                    name="expdate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expdate}
                    error={errors.expdate}
                    autoFocus
                  />
                  <Row>
                    {touched.expdate && errors.expdate && (
                      <small className="text-danger error_Field">
                        {errors.expdate}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleSave}>
                    Save{" "}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <div className="mt-3">
        <ExprnseRecord />
      </div>
    </div>
  );
};
export default Expense;
