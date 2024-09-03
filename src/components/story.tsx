import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Employee } from './mui-table';
import { MockData } from '../mock-data';
import { useLocation, useNavigate } from 'react-router-dom';


const StoryCreationForm: React.FC = () => {
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { row } = location.state || {};

    console.log('row value', row);



    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const startDate = row && row.startDate.split("/")[2] + "-" + row.startDate.split("/")[0] + "-" + row.startDate.split("/")[1];
    const targetDate = row && row.targetDate.split("/")[2] + "-" + row.targetDate.split("/")[0] + "-" + row.targetDate.split("/")[1];

    console.log({ startDate });

    const [dynamicFields, setDynamicFields] = useState({
        dueDate: row ? startDate : '',
        estimatedTime: row ? targetDate : '',
        progress: row ? row.progress : '',
        storyId: row ? row.storyId : '',
        attachment: row ? row.attachment : '',
        status: row ? row.status : '',
        priority: row ? row.priority : '',
        type: row ? row.type : '',
        component: row ? row.component : '',
        sprint: row ? row.sprint : '',
        labels: row ? row.labels : '',
        relatedTickets: row ? row.relatedTickets : '',
    });

    const handleFieldToggle = (field: string) => {
        setSelectedFields((prevSelected) =>
            prevSelected.includes(field)
                ? prevSelected.filter((f) => f !== field)
                : [...prevSelected, field]
        );
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setDynamicFields({
            dueDate: '',
            estimatedTime: '',
            progress: '',
            storyId: '',
            attachment: '',
            status: '',
            priority: '',
            type: '',
            component: '',
            sprint: '',
            labels: '',
            relatedTickets: '',
        });
        setSelectedFields([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Story-creation api logics codes ...

        const newStory: Employee = {
            storyName: title,
            description: description,
            progress: (Math.floor(Math.random() * 100)).toString(), // Random progress between 0-100
            // storyId: Math.floor(Math.random() * 100000), // Random storyId
            storyId: dynamicFields.storyId,
            startDate: dynamicFields.dueDate,
            targetDate: dynamicFields.estimatedTime,
            attachment: dynamicFields.attachment,
            status: dynamicFields.status,
            priority: dynamicFields.priority,
            type: dynamicFields.type,
            component: dynamicFields.component,
            sprint: dynamicFields.sprint,
            labels: dynamicFields.labels,
            tickets: dynamicFields.relatedTickets,

        };

        MockData.push(newStory);
        navigate("/");
        handleCancel(); // Reset form after submission
    };

    return (
        <div style={{ backgroundColor: 'white', margin: "40px", border: "1px solid #E3E7EB", padding: '20px', borderRadius: '5px' }}>
            <InputLabel sx={{ fontWeight: 'bold', color: '#544646' }}>Add Ticket Details</InputLabel>
            <InputLabel sx={{ fontSize: '13px', }}>Fill out following detail to create a new story!</InputLabel>
            <InputLabel sx={{ marginTop: '6px', marginBottom: '20px', fontWeight: 'bold', color: '#544646' }}>Basic Details</InputLabel>
            <Box display="flex" flexDirection="row" gap={2}>
                {/* Title and Description Fields */}
                <Box
                    id="title-description-container"
                    display="flex"
                    flexDirection="column"
                    width="70%"
                    marginTop={1}
                >
                    <TextField
                        label="Title"
                        value={row ? row.storyName : title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size='small'
                    />
                    <TextField
                        label="Description"
                        value={row ? row.description : description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size='small'
                        sx={{ height: "200px" }}
                        multiline
                    />
                </Box>

                {/* Add Ticket Details Dropdown */}
                <Box width={"30%"} >
                    <InputLabel id="add-ticket-details-label">Add Ticket Details</InputLabel>
                    <Select
                        labelId="add-ticket-details-label"
                        placeholder='ksldfkjasldfkj'
                        multiple
                        value={selectedFields}
                        onChange={(e) => {
                            setSelectedFields(
                                typeof e.target.value === 'string'
                                    ? e.target.value.split(',')
                                    : e.target.value
                            );
                        }}
                        renderValue={(selected) => selected.join(', ')}
                        fullWidth
                        size='small'
                    >
                        {Object.keys(dynamicFields).map((field) => (
                            <MenuItem key={field} value={field} sx={{ height: "30px" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedFields.includes(field)}
                                            onChange={() => handleFieldToggle(field)}
                                        />
                                    }
                                    label={field.replace(/([A-Z])/g, ' $1')}
                                />
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Dynamic Fields */}

                    {(selectedFields.includes('dueDate') || row && row.startDate) && (
                        <TextField
                            type="date"
                            fullWidth
                            size='small'
                            margin="normal"
                            value={dynamicFields.dueDate}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    dueDate: e.target.value,
                                })
                            }
                        />
                    )}
                    {(selectedFields.includes('estimatedTime') || row && row.targetDate) && (
                        <TextField
                            type="date"
                            fullWidth
                            size='small'
                            margin="normal"
                            value={dynamicFields.estimatedTime}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    estimatedTime: e.target.value,
                                })
                            }
                        />
                    )}
                    {(selectedFields.includes('attachment') || row && row.attachment) && (
                        <TextField
                            type="file"
                            fullWidth
                            size='small'
                            margin="normal"
                            // value={"dynamicFields.attachment"}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    attachment: row.attachment || e.target.value,
                                })
                            }
                        />
                    )}

                    {(selectedFields.includes('status') || row && row.status) && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                size='small'
                                defaultValue={row.status}
                                // value={'dynamicFields.status'}
                                onChange={(e) =>
                                    setDynamicFields({
                                        ...dynamicFields,
                                        status: e.target.value,
                                    })
                                }
                                label="Status"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(selectedFields.includes('priority') || row && row.priority) && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={dynamicFields.priority}
                                onChange={(e) =>
                                    setDynamicFields({
                                        ...dynamicFields,
                                        priority: e.target.value,
                                    })
                                }
                                size='small'
                                label="Priority"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(selectedFields.includes('type') || row && row.type) && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={dynamicFields.type}
                                onChange={(e) =>
                                    setDynamicFields({
                                        ...dynamicFields,
                                        type: e.target.value,
                                    })
                                }
                                size='small'
                                label="Type"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Bug">Bug</MenuItem>
                                <MenuItem value="Feature">Feature</MenuItem>
                                <MenuItem value="Task">Task</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {(selectedFields.includes('component') || row && row.component) && (
                        <TextField
                            label="Component"
                            value={dynamicFields.component}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    component: e.target.value,
                                })
                            }
                            variant="outlined"
                            size='small'
                            fullWidth
                            margin="normal"
                        />
                    )}

                    {(selectedFields.includes('sprint') || row && row.sprint) && (
                        <TextField
                            label="Sprint"
                            value={dynamicFields.sprint}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    sprint: e.target.value,
                                })
                            }
                            variant="outlined"
                            size='small'
                            fullWidth
                            margin="normal"
                        />
                    )}

                    {(selectedFields.includes('labels') || row && row.labels) && (
                        <TextField
                            label="Labels"
                            value={dynamicFields.labels}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    labels: e.target.value,
                                })
                            }
                            variant="outlined"
                            size='small'
                            fullWidth
                            margin="normal"
                        />
                    )}

                    {(selectedFields.includes('relatedTickets') || row && row.relatedTickets) && (
                        <TextField
                            label="Related Tickets"
                            value={dynamicFields.relatedTickets}
                            onChange={(e) =>
                                setDynamicFields({
                                    ...dynamicFields,
                                    relatedTickets: e.target.value,
                                })
                            }
                            variant="outlined"
                            size='small'
                            fullWidth
                            margin="normal"
                        />
                    )}
                </Box>
            </Box>
            {/* Action Buttons */}
            <Box id="action-btn" display={'flex'} gap={1}>
                <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ color: 'gray', backgroundColor: '#E9EAEC', textTransform: 'capitalize', px: '46px', borderColor: '#E9EAEC' }}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleSubmit} sx={{ textTransform: 'capitalize', px: '32px' }}>
                    Create Story
                </Button>
            </Box>
        </div>
    );
};

export default StoryCreationForm;
