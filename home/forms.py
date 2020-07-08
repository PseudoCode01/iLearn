from django import forms

class EmailForm(forms.ModelForm):
    class Meta:
        fields=('email')
    widgets={
        'email'forms.TextInput(attrs={'class':'form-control'})
    }