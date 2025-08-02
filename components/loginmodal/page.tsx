"use client"
import { Button } from '@mui/material';
import { useState } from 'react';
import LoginModal from '@/components/loginmodal/login'

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                variant='contained'
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    backgroundColor: "#00796B",
                    "&:hover": {
                        backgroundColor: "#005A4F"
                    }
                }}
            >
                Sign In
            </Button>
            <LoginModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />
        </>
    )
}

export default Home;