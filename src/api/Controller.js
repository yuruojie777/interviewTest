  // useEffect(()=>{
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch('https://jsonplaceholder.typicode.com/posts', {signal})
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json);
  //     setPosts(json);
  //   }).catch(err=>{
  //     if(err.name === 'AbortError'){
  //       console.log('cancelled!');
  //     }else{
  //       //handle errors
  //     }
  //   })

  //   return ()=>{
  //     controller.abort();
  //   }
  // },[])