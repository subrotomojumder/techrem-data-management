export const handleClipboardCopy = data => {
    data.current.select();
    // data.current.setSelectionRange(0, 1000000 );
    navigator.clipboard.writeText(data.current.value);
    alert("copy to clipboard!")
  }