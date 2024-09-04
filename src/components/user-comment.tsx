import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface CommentProps {
    username: string;
    commentText: string;
    date: string;
}

const UserComments: React.FC<CommentProps> = ({ username, commentText, date }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleLike = () => setLikes(likes + 1);
    const handleDislike = () => setDislikes(dislikes + 1);
    const handleReply = () => setShowReply(!showReply);
    const handleReplySubmit = () => {
        console.log('Reply:', replyText);
        setReplyText('');
        setShowReply(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="success" onClick={() => { }} sx={{ textTransform: 'capitalize', px: '45px', py: '2px', display: 'flex' }}>
                    New Comment
                </Button>
            </div>
            {
                [1, 2].map((item, key) => <Box sx={{ border: '1px solid #ddd', borderRadius: '5px', p: 2, mt: 2, mb: 4, backgroundColor: '#E3E7EB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                        <Typography variant="h6">{username}</Typography>
                        <InputLabel sx={{ fontSize: '15px' }}>{date}</InputLabel>
                    </div>
                    <InputLabel sx={{ fontSize: '15px' }}>{commentText}</InputLabel>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton onClick={handleLike} size="small">
                            <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ mx: 1 }}>{likes}</Typography>

                        <IconButton onClick={handleDislike} size="small">
                            <ThumbDownIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ mx: 1 }}>{dislikes}</Typography>

                        {/* <Button variant="text" onClick={handleReply} size="small">
                    {showReply ? 'Cancel' : 'Reply'}
                </Button> */}
                    </Box>

                    {/* {showReply && (
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Write a reply..."
                        fullWidth
                        size="small"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />

                    <Button variant="contained" color="success" onClick={handleReplySubmit} sx={{ textTransform: 'capitalize', px: '32px' }}>
                        Submit Reply
                    </Button>
                </Box>
            )} */}
                </Box>)}
        </>
    );
};

export default UserComments;
