SELECT C.ID, C.Nombre, C.Apellido, SUM(V.Importe) AS TotalCompras
FROM Clientes C
JOIN Ventas V ON C.ID = V.Id_cliente
WHERE V.Fecha >= NOW() - INTERVAL '12 months'
GROUP BY C.ID, C.Nombre, C.Apellido
HAVING SUM(V.Importe) > 100000;