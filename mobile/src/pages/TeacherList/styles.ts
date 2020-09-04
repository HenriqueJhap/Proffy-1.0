import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    teacherList: {
        marginTop: -40,
        
    },

    searchForm: {
        marginBottom: 24,

    },

    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular',
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    inputBlock: {
        width: 200
    
    },

    input: {
        height:54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },

    timeBlock: {
    
        height:160,
        width: 110,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        
        paddingVertical: 16,
        paddingHorizontal: 25,
        marginTop: 4,
        marginBottom: 16,
    } ,

    timeText:{
        fontSize: 18
    },

    timePicker:{
     
    },
    
    submitButton: {
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    submitButtonText:{
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    },

})

export default styles;