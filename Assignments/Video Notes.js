//initiate jquery in terminal using
//npm init
//npm i jquery
$(document).ready(function(){



//grab the body element
console.log($('body'));

//jquery allows us to select elements from DOM such as 
//user Id(note by #), class (note by .) or tag name (text of tag)
//to use $()

let p = $('#test');
let div = $('.my-class');
let ul = $('ul');

console.log(p);
console.log(div);
console.log(ul);

//to use these elements and make them do something by interacting
//with the DOM:
// to get and set values:
console.log(p.text());  //p=the element object of the jquery call,
// text is the method on that object
p.text('New Text');   //passing in a string argument it sets the text
//if nothing is passed thru then it returns the text
//$('input').val('New Value');   //reference to the input we just put in
//val sets the value of the input.

//can also access and change attributes on an element
//the method to change the attributes:
$('input').attr('placeholder', 'Placeholder Text');
//requires 2 arguments: what the attribute is & the value

//to add an element to the DOM there are 4 ways: append, prepend will add 
//content to either the end or beginning of an element
//The methods: After & Before add content to the immediate after or before 
//an element
div.prepend('<p>prepended paragraph');
div.append('<p>appended paragraph');
div.before('<p>paragraph added before the div');
div.after('<p>paragraph added after the div');

//to remove elements there are 2 ways: remove & empty
//remove method deletes the elements and all its children from the DOM
//empty method deletes the children of the selected element from the DOM
div.empty(''); //will remove all of the div and its elements
ul.remove(''); //removed the entire element all together

//to hide an element use the Hide and Show methods
$('input').hide();
setTimeout(() => $('input').show(), 2000);

//AJAX methods: request and post
$.get('https://reqres.in/api/users/2', (data) => console.log(data));
})





