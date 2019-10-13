# Photoshop automatization

## General description
I had to proceed many PSD files so I bring the idea to writing automatization script. During developing it turned out that more than one script is needed.  

[Adobe documentation](https://www.adobe.com/content/dam/acom/en/devnet/photoshop/scripting/Photoshop-CS6-JavaScript-Ref.pdf) is really very well so I based only on it. 


## Establishments

 - format BMP 16 bit (r6,g5,b6)
 - final pictures should be saved up side down 
 - every language is saved in another text layer
## Scripts description
The names of the scripts are a bit to long but therefore are very suggestive. 
 For example "select_proper_language_in_selected_files_and_save_them_to_bmp.jsx" script opens dialog window and facilitate select files, then enable single language (other are trurned off) and exports bmp file with proper settings. Then it turn on other language and reped procedure.  Above are repeted for every selected file automatically.
