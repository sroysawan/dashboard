import React from "react";
import reactCSS from "reactcss";

class Color extends React.Component {
    state = {
        color: {
            r: "0",
            g: "0",
            b: "255",
            a: "1",
        },
        colorwork: {
            r: "0",
            g: "128",
            b: "0",
            a: "1",
        },
        colorbreak: {
            r: "255",
            g: "165",
            b: "0",
            a: "1",
        },
        colordown: {
            r: "255",
            g: "0",
            b: "0",
            a: "1",
        },
    };

    render() {
        const styles = reactCSS({
            default: {
                color: {
                    width: "40px",
                    height: "25px",
                    borderRadius: "2px",
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                colorwork: {
                    width: "40px",
                    height: "25px",
                    borderRadius: "2px",
                    background: `rgba(${this.state.colorwork.r}, ${this.state.colorwork.g}, ${this.state.colorwork.b}, ${this.state.colorwork.a})`,
                },
                colorbreak: {
                    width: "40px",
                    height: "25px",
                    borderRadius: "2px",
                    background: `rgba(${this.state.colorbreak.r}, ${this.state.colorbreak.g}, ${this.state.colorbreak.b}, ${this.state.colorbreak.a})`,
                },
                colordown: {
                    width: "40px",
                    height: "25px",
                    borderRadius: "2px",
                    background: `rgba(${this.state.colordown.r}, ${this.state.colordown.g}, ${this.state.colordown.b}, ${this.state.colordown.a})`,
                },
            },
        });

        return (
            <>
                <div style={styles.color} />
                เครื่องว่าง 
                <div style={styles.colorwork} />
                เครื่องทำงาน
                <div style={styles.colorbreak} />
                เครื่องเบรก
                <div style={styles.colordown} />
                เครื่องเสีย
            </>
           
            
            
        );
    }
}

export default Color;
