import { FormControl, FormControlLabel, FormLabel, TextField, RadioGroup, Radio } from "@material-ui/core";
import { Button, Paper } from "@material-ui/core";
import { useState } from "react";

function SessionSetup(props) {

    const [username, setUsername] = useState('')
    const [usernameSelected, setUsernameSelected] = useState(false)
    const [difficulty, setDifficulty] = useState(0)

    let handleUsernameChange = (ev) => {
        setUsername(ev.target.value)
    }

    let handleDifficultyChange = (ev) => {
        setDifficulty(ev.target.value)
    }
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            {
                !usernameSelected || username === '' ?
                    <Paper elevation={3} style={{width: '200px', height: 'auto', padding: '48px 48px 24px 48px'}}>
                        <form onSubmit={() => setUsernameSelected(true)}>
                            <TextField
                                id={`username`}
                                defaultValue={''}
                                placeholder={'Ingrese su nombre'}
                                onChange={(ev) => {
                                    handleUsernameChange(ev)
                                }}
                            />
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
                                <Button color='primary' type='submit'>
                                    Siguiente
                                </Button>
                            </div>
                        </form>
                    </Paper>
                :
                    <Paper elevation={3} style={{width: '200px', height: 'auto', padding: '48px 48px 24px 48px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Elija un nivel de dificultad</FormLabel>
                            <RadioGroup aria-label="quiz" name="quiz" value={parseInt(difficulty)} onChange={(ev) => {handleDifficultyChange(ev)}}>
                                {
                                    props.difficulties.map(difficulty => {
                                        return (
                                            <FormControlLabel value={difficulty.level} control={<Radio />} label={difficulty.display} key={difficulty.level}/>
                                        )
                                    })
                                }
                            </RadioGroup>
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
                                <Button color='primary' onClick={() => props.saveOptions(username, difficulty)}>
                                    Finalizar
                                </Button>
                            </div>
                        </FormControl>
                    </Paper>
            }
            
        </div>
    )
}

export default SessionSetup;