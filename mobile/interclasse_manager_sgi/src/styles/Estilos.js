import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    card: {
        width: '95%',
        maxWidth: 430,
        backgroundColor: 'rgba(0,0,0,0.78)',
        borderRadius: 35,
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)'
    },

    logo: {
        width: 240,
        height: 240,
        alignSelf: 'center',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },

    titulo: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center'
    },

    subtitulo: {
        fontSize: 14,
        color: '#bdbdbd',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 25
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 18,
        height: 62,
        marginBottom: 18
    },

    input: {
        flex: 1,
        color: '#000',
        marginLeft: 10,
        fontSize: 15
    },
    

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    switchRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    rememberText: {
        color: '#d0d0d0',
        marginLeft: 6
    },

    forgot: {
        color: '#c5a059',
        fontWeight: '600'
    },

    primaryButton: {
        height: 58,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#111'
    },

    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1
    },

    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25
    },

    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)'
    },

    separatorText: {
        color: '#999',
        marginHorizontal: 10
    },

    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    socialButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,
        borderRadius: 16,
        backgroundColor: '#161616',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        marginHorizontal: 5
    },

    socialText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600'
    },

    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },

    registerText: {
        color: '#bdbdbd'
    },

    registerLink: {
        color: '#c5a059',
        fontWeight: 'bold',
        marginLeft: 5
    },

    error: {
        color: '#ff6b6b',
        textAlign: 'center',
        marginTop: 12
    },

    footer: {
        color: '#888',
        textAlign: 'center',
    }
});