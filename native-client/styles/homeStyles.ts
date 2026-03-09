import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#FF8C00',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 4,
    },
    statusBanner: {
        backgroundColor: '#333333',
        padding: 12,
        alignItems: 'center',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    listContainer: {
        padding: 16,
    },
    alertCard: {
        flexDirection: 'row-reverse',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    alertIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
    },
    alertIconText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    alertDetails: {
        flex: 1,
        alignItems: 'flex-end',
    },
    alertLocation: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    alertType: {
        fontSize: 14,
        color: '#D32F2F',
        marginTop: 4,
        fontWeight: '600',
    },
    alertTime: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4,
    },
});
