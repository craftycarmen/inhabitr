import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchQuestions } from "../../store/questions";
import { Box, Container, Button } from "@mui/material";

function QuestionCard() {
    const dispatch = useDispatch();
    const questions = Object.values(useSelector(state => (state.questions)))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchQuestions());
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, [dispatch])

    const handleNextQuestion = () => {
        if (questions.length > 0 && currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setShowSolution(false);
        }
    };

    const handleToggleSolution = () => {
        setShowSolution((prev) => !prev);
    };

    const currQuestion = questions[currentIndex]

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 2
            }}>
            <h1>LeetCode Questions </h1>
            {currQuestion ? (
                <Box>
                    <Box
                        sx={{
                            border: "1px solid #000",
                            padding: 2,
                            borderRadius: 1,
                            width: "400px",
                            height: "250px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: "#62a8a0"
                        }}
                    >
                        <h2>{currQuestion.title}</h2>
                        {showSolution ? (
                            <Box
                                sx={{
                                    textAlign: "left",
                                    overflow: "auto",
                                    padding: "0px 15px",
                                    backgroundColor: "#f6fafa",
                                    borderRadius: "3px",
                                    height: "125px",
                                    '& pre': {

                                        fontSize: '12px',

                                    }
                                }}>

                                <pre>{currQuestion.solution}</pre>
                            </Box>
                        )
                            : (
                                <Box
                                    sx={{
                                        textAlign: "left",
                                        overflow: "auto",
                                        padding: "0px 15px",

                                        borderRadius: "3px",
                                        height: "125px",

                                    }}>
                                    <p>{currQuestion.description}</p>

                                </Box>
                            )
                        }
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 'auto',
                                paddingTop: "20px"
                            }}>
                            <Button
                                onClick={handleToggleSolution}>
                                {showSolution ? "Hide Solution" : "Show Solution"}
                            </Button>
                            <Button
                                onClick={handleNextQuestion}
                                disabled={currentIndex === questions.length - 1}
                            >
                                Next
                            </Button>
                        </Box>

                    </Box>
                </Box>
            ) : (
                <p>Loading question...</p>
            )
            }

        </Container >
    )
}

export default QuestionCard
