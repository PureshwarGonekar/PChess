import React from 'react'

const temp = () => {
  return (
<div>
    
<div className='Play_screen'>
    <div className='Play_container'>

        <h1> Your Username: </h1>
        <input
            ref={textArea}
            onInput={typingUserName}
        />
        <button
            className="btn btn-primary"
            disabled={!inputText.length > 0}>
            Submit
        </button>
    </div>
</div>

<form onSubmit={handleSubmit}>
    <h1 style={{ textAlign: "center", marginTop: `${(window.innerHeight / 3)}px` }}>
        Your Username:
    </h1>
    <input
        style={{
            marginLeft: `${(window.innerWidth / 2) - 120}px`,
            width: "240px",
            marginTop: "62px"
        }}
        ref={textArea}
        onInput={typingUserName}
    />
    <button
        type='submit'
        className="btn btn-primary"
        style={{
            marginLeft: `${(window.innerWidth / 2) - 60}px`,
            width: "120px",
            marginTop: "62px"
        }}
        disabled={!inputText.length > 0}
    >
        Submit
    </button>
</form>
    
    
    
    
    
    
    
    
    </div>
  )
}

export default temp