import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insubmitForm } from "../Redux/IncomeDataSlice";
import { Button, Modal, Form, Navbar, Container, Row } from "react-bootstrap";
import IncomeRecord from "./IncomeRecord";
import Expense from "./Expense";
import * as yup from "yup";
import { Formik } from "formik";

const Income = () => {
  // const Data = useSelector((state) => state.data);
  // const incomAmu = useSelector((state) => state.data.length > 0 ? state.data[state.data.length - 1].amount : '');
  // const expenAmu = useSelector((state) => state.Expdata.length > 0 ? state.Expdata[state.Expdata.length - 1].expamu : '');
  // const Total=incomAmu-expenAmu

  const Data = useSelector((state) => state.incom);
  const totalInAmounts = Data?.incomdata?.map((record) => record.amount);

  const incomTotal = totalInAmounts?.reduce(
    (acc, curr) => acc + parseFloat(curr),
    0
  );

  const data = useSelector((state) => state.exp);
  const totalExAmounts = data?.expdata?.map((record) => record.expamu);
  const expTotal = totalExAmounts?.reduce(
    (acc, curr) => acc + parseFloat(curr),
    0
  );

  const Total = incomTotal - expTotal;

  const dispatch = useDispatch();
  const initialState = {
    amount: "",
    type: "",
    amuname: "",
    date: "",
  };
  const validationSchema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
    type: yup.string().required("Amount type is required"),
    amuname: yup.string().required("Amount name is required"),
    date: yup.string().required("Date is required"),
  });
  const modelSubmit = (values, { resetForm }) => {
    dispatch(insubmitForm(values));
    resetForm();
    console.log("insubmit", values);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("save");
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
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand>Current Amount : {Total}</Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Button className="ms-2 mt-2" onClick={handleButtonClick}>
        Add Income Details
      </Button>
      <div className="mt-3">
        <IncomeRecord />
      </div>

      <Modal className="mt-5" show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Current Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={modelSubmit}
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
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    error={errors.amount}
                    autoFocus
                  />
                  <Row>
                    {touched.amount && errors.amount && (
                      <small className="text-danger error_Field">
                        {errors.amount}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Income Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.type}
                    error={errors.type}
                    autoFocus
                  >
                    <option> Select Income Type</option>
                    <option value="Fixed Income">Fixed Income</option>
                    <option value="Extra Income">Extra Income</option>
                  </Form.Select>
                  <Row>
                    {touched.type && errors.type && (
                      <small className="text-danger error_Field">
                        {errors.type}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Amount Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Amount Name"
                    name="amuname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amuname}
                    error={errors.amuname}
                    autoFocus
                  />
                  <Row>
                    {touched.amuname && errors.amuname && (
                      <small className="text-danger error_Field">
                        {errors.amuname}
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
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    error={errors.date}
                    autoFocus
                  />
                  <Row>
                    {touched.date && errors.date && (
                      <small className="text-danger error_Field">
                        {errors.date}
                      </small>
                    )}
                  </Row>
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <div className="mt-5">
        <Expense />
      </div>
    </div>
  );
};
export default Income;
