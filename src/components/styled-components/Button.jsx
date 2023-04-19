import styled, { css } from 'styled-components'

export const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid white;
    color: white;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s ease;
    &:hover{
        background-color: palevioletred;
        color: white;
    }
    ${props =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
            &:hover{
                background-color: white;
                color: palevioletred;
                border-color: palevioletred
            }
        `
    }
`
