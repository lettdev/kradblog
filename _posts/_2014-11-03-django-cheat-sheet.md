---
layout: post
title: Test Syntax Highlight
---

{% highlight html %}
<HTML>
<HEAD><TITLE>Choice</TITLE>

<SCRIPT Language="javascript">

// sets up database of links - SECTION A1
muresources=""
muresources["classical"]= "<A HREF='http://net.com/classical.file1'>Meditative classical music<A><P>
 <A HREF='http://net.com/classical.file2'>Provoking classical music<A>"
muresources["rock"] = "<A HREF='http://net.com/rock.file1'>Popular rock music<A><P>
 <A HREF='http://net.com/rock.file2'>Exciting rock music<A>"
muresources["ethnic"] = "<A HREF='http://net.com/mexican.file1'>Mexican music<A><P>
 <A HREF='http://net.com/Indian.file2'>Indian music<A>"

function getLink() {
// constructs unique page using name and choice of music - SECTION A.2
temp = muresources[choice]
temp2 = "<TITLE>Custom Links</TITLE><H3>" +document.m.pername.value+", here are some
links for you</H3><P>"+temp
}

function writeIt(){
// creates new window to display page - SECTION A.3
diswin = window.open();
diswin.document.open();
diswin.document.write(temp2);
diswin.document.close()
}

function doAll(){
// master routine calls other functions - SECTION A.4
getLink();
writeIt()
}
</SCRIPT>

</HEAD>
<BODY >

<!-- Sets up basic input form SECTION B -->
<H3> Choose the kind of music you prefer<BR>
and this page will fetch links of interest to you</H3>

<HR>

<FORM NAME="m" >
Choose a kind of music<P>
<INPUT TYPE="radio" NAME="mus" VALUE="classical" OnClick="choice='classical'"
>Classical <BR>
<INPUT TYPE="radio" NAME="mus" VALUE="rock" OnClick="choice='rock'">Rock<BR>
<INPUT TYPE="radio" NAME="mus" VALUE="ethnic"
OnClick="choice='ethnic'">Ethnic<BR>
<HR>
Please type your name<P>
<INPUT TYPE="text" NAME="pername" SIZE=25>
<HR>
<INPUT TYPE="button" NAME="sub" VALUE="Show me links" OnClick=doAll()>
<INPUT TYPE="reset" NAME="res" >
</FORM>

<SCRIPT>
// sets defaults - SECTION C
choice = "classical"
document.m.mus[0].checked = true
document.m.mus[1].checked = false
document.m.mus[2].checked = false
</SCRIPT>
</BODY>
</HTML>
{% endhighlight %}

{% highlight javascript %}
// Puts the text to scroll into variable called sent - SECTION A
// uses length propert to assess its length and put into variable slen
// initalizes a,b,n, and subsent variables
var sent = "This is a demonstration of a banner moving from the left to right. It makes use of the substring property of Javascript to make an interesting display"
var slen = sent.length
var siz = 25
var a = -3, b = 0
var subsent = "x"

// Creates a function to capture substrings of sent - SECTION B
function makeSub(a,b) {
subsent = sent.substring(a,b) ;
return subsent;
}

//Creates a function that increments the indexes of the substring - SECTION C 
//each time and calls the makeSub() function to geneate strings
//a indicates start of substring and siz indicates size of string required
function newMake() {
a = a + 3;
b = a + siz
makeSub(a,b);
return subsent
}

//function uses loop to get changing substrings of target - SECTION D
//repeatedly calls newMake to get next substring
//uses setTimeout() command to arrange for substrings to display 
// at specified times
function doIt() {
for (var i = 1; i <= slen ; i++) {
setTimeout("document.z.textdisplay.value = newMake()", i*300);
setTimeout("window.status = newMake()", i*300);
}
}
{% endhighlight %}

<h2>Start a project</h2>
{% highlight bash %}
django-admin.py startproject AcmeIntranet
cd AcmeIntranet
mkdir templates
mkdir media
{% endhighlight %}

{% highlight python %}
from django.db import models
from django.contrib.auth.models import User

class Ticket (models.Model):
    user = models.ForeignKey (User) 
    case_number = models.IntegerField()
    dollar_amount = models.DecimalField('Cost (in dollars)', max_digits=10, decimal_places=2)

    def __unicode__(self):
            return u"%s" % self.id
{% endhighlight %}