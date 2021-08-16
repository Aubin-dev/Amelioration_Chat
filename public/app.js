const ws = new WebSocket('ws://localhost:8080')

ws.addEventListener('open',()=>{
    
})
ws.addEventListener('message',(message)=>{
    let form = document.querySelector('form')
    let input=document.querySelector('#message')
    let messages = document.querySelector('#messages')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        ws.send(JSON.stringify({type:'SEND_MESSAGE', data:input.value}))
    })
    ws.addEventListener('message', function (input){
        messages.append($(`<p>${input}</p>`));
        });
})
ws.addEventListener('close',()=>{

})