import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import "../../../styles/Landing/Landing.scss";
import firebase from "../../../utils/firebase";
import {Modal, Button, message} from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Input } from 'antd';
import {InputLabel} from "@material-ui/core";

const { TextArea } = Input;

const Landing = () => {
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const createShowModal = () => {
        setCreateModalVisible(true);
    };

    const updateShowModal = () => {
        setUpdateModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const createHandleCancel = () => {
        setCreateModalVisible(false);
    };

    const updateHandleCancel = () => {
        setUpdateModalVisible(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const collection = firebase.firestore().collection("inventories")
    const getInventories = () => {
        setLoading(true);
        collection.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setInventories(items);
            setLoading(false);
        })
    }
    // ADD AN INVENTORY
    const addInventory = (newInventory) => {
        collection
            .doc(newInventory.id)
            .set(newInventory)
            .catch((err) => {
                message.error(err, 5);
            })
    }
    // EDIT AN INVENTORY
    const editInventory = (updatedInventory) => {
        collection
            .doc(updatedInventory.id)
            .update(updatedInventory)
            .catch((err) => {
                message.error(err, 5);
            })
    }
    // DELETE AN INVENTORY
    const deleteInventory = (inventory) => {
        collection
            .doc(inventory.id)
            .delete()
            .catch((err) => {
                message.error(err, 5)
            })
    }
    useEffect(() => {
        getInventories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (loading) {
        return <h1>Loading ....</h1>
    }
    return (
        <div className="inventory-landing-page">
            <div className="inventory-topbar">
                <div className="topbar-title">
                    <h2>Inventory Keeping Web App</h2>
                </div>
            </div>
            <center><h2 className="body-title">Inventory Records</h2></center>
            <div className="body-section">
                <div className="inventory-list">
                    <div className="list-inventories">
                        <table>
                            <tr className="table-header">
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            {inventories.length === 0  ? (
                                <tr>
                                    <h4 className="no-inventories">You have no inventories</h4>
                                </tr>
                            ): inventories.map((inventory) => (
                            <tr>
                                <td><h4>{inventory.title}</h4></td>
                                <td><h4>{inventory.description}</h4></td>
                                <td>
                                    <Modal
                                        title="Update Inventory"
                                        visible={updateModalVisible}
                                        onOk={() => { editInventory({title, description, id: inventory.id}); setUpdateModalVisible(false)}} onCancel={updateHandleCancel}>
                                        <InputLabel>Title</InputLabel>
                                        <Input placeholder={inventory.title} allowClear onChange={handleTitleChange} />
                                        <br />
                                        <br />
                                        <InputLabel>Description</InputLabel>
                                        <TextArea placeholder={inventory.description} allowClear onChange={handleDescriptionChange} />
                                    </Modal>
                                    <Button className="update-button" type="primary" onClick={updateShowModal}>
                                        Update
                                    </Button>
                                    <Modal
                                        title="Delete Inventory"
                                        visible={modalVisible}
                                        onOk={() => { deleteInventory(inventory); setModalVisible(false)}} onCancel={handleCancel}>
                                        <h3>Are you sure you want to delete this inventory ??</h3>
                                    </Modal>
                                    <Button className="delete-button" type="danger" onClick={showModal}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                            ))}
                        </table>
                    </div>
                        <Modal
                            title="Add Inventory"
                            visible={createModalVisible}
                            onOk={() => { addInventory({id: uuidv4(), title, description}); setCreateModalVisible(false)}} onCancel={createHandleCancel}>
                            <InputLabel>Title</InputLabel>
                            <Input placeholder="input your title" allowClear onChange={handleTitleChange} />
                            <br />
                            <br />
                            <InputLabel>Description</InputLabel>
                            <TextArea placeholder="Fill your description" allowClear onChange={handleDescriptionChange} />
                        </Modal>
                        <Button className="create-button" onClick={createShowModal}>
                            Create a new inventory
                        </Button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Landing);