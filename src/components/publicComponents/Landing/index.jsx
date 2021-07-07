import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import "../../../styles/Landing/Landing.scss";
import firebase from "../../../utils/firebase";
import { v4 as uuidv4 } from 'uuid';

const Landing = ({ history }) => {
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const ref = firebase.firestore().collection("inventories")

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const getInventories = () => {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
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
        ref
            .doc(newInventory.id)
            .set(newInventory)
            .catch((err) => {
                console.error(err);
            })
    }
    // EDIT AN INVENTORY
    const editInventory = (updatedInventory) => {
        ref
            .doc(updatedInventory.id)
            .update(updatedInventory)
            .catch((err) => {
                console.error(err);
            })
    }
    // DELETE AN INVENTORY
    const deleteInventory = (inventory) => {
        ref.doc(inventory.id)
            .delete()
            .catch((err) => {
                console.log(err);
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
            <center><b><h2>Inventory Keeping of goods</h2></b></center>
            <div className="body-section">
                <div className="main-area">
                    {/*<div className="create-inventory-details">*/}
                    {/*    <h2 className="heading-add-inventory">Add an Inventory</h2>*/}
                    {/*    <div className="form">*/}
                    {/*        <label>Title</label><br/>*/}
                    {/*        <input*/}
                    {/*            className="inventory-input"*/}
                    {/*            onChange={handleTitleChange}*/}
                    {/*            type="text"*/}
                    {/*        />*/}
                    {/*        <label>Description</label><br/>*/}
                    {/*        <input*/}
                    {/*            className="inventory-input"*/}
                    {/*            onChange={handleDescriptionChange}*/}
                    {/*            type="text"*/}
                    {/*        />*/}
                    {/*        <br/>*/}
                    {/*        <button*/}
                    {/*            className="custom-button"*/}
                    {/*            onClick={() => addInventory({id: uuidv4(), title, description})}*/}
                    {/*            type="submit">Add Inventory*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="inventory-list">
                    <h3>List of Inventories</h3><br/>
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
                            ):
                            inventories.map((inventory) => (
                            <tr>
                                    <td><h4>{inventory.title}</h4></td>
                                    <td><h4>{inventory.description}</h4></td>
                                    <td><button
                                        className="update-custom-button"
                                        type="submit"
                                        onClick={() => editInventory({title: inventory.title, description, id: inventory.id})}
                                    >
                                        Update Inventory
                                    </button>
                                    <button
                                        className="delete-custom-button"
                                        type="submit"
                                        onClick={() => deleteInventory(inventory)}
                                    >
                                        Delete Inventory
                                    </button>
                                    </td>
                            </tr>
                            ))}
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Landing);