import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export function DialogDefault() {
    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    async function handleDelete() {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/user/del-user/${id}`)
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    return (
        <div>
            <>
                <Button onClick={handleOpen} variant="gradient" color="red">
                    Delete
                </Button>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Confirm</DialogHeader>
                    <DialogBody>
                        Do want to confirm this action? This action is irreversible.
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="red" onClick={handleOpen}>
                            <span onClick={handleDelete}>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        </div>
    );
}