//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark)

function saveBookmark() {
    // Get form values

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
        name: siteName,
        url: siteURL
    }

        //Checking to verify if there's proper input
        if (!siteName || !siteURL) {
            alert('ERROR: Please enter Site Name and URL');
            return false;
        }

        //Expression to format URL
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (!siteURL.match(regex)) {
            alert('ERROR: Please use a valid URL')
            return false; {
            
            }
           
        }

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
        //Clear form
        document.getElementById('myForm').reset();


        //Re-fetch bookmarks;
        fetchBookmarks();

    
    }
    console.log(bookmark)

    e.preventDefault();
}

//Delete Bookmarks

function deleteBookmark(url) {
    console.log(url);
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks;
    fetchBookmarks();
}

// Fetch Bookmarks

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Push output

    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>'+name+
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#" ' + url + ' ">Delete</a> '
        '</h3>';
        '</div>'
        
    }

}

