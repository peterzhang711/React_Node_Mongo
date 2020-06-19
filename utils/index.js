
export function getRedirectTo(type, header) {
  let path
  //type
  if(type==='business'){
    path = '/business'
  }else {
    path = '/private'
  }
  //header
  if(!header) {   
    path += 'info'
  }
  return path
}