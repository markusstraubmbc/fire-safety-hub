-- v1050 -> v1051: Permission für Einsatzzeiten-Dashboard (Hilfsfrist-Analyse)

-- Permission type
-- Fix: Removed 'module' column which does not exist in the permission_types table.
-- The module context is already encoded in the code field ('backend.statistics.einsatzzeiten').
INSERT IGNORE INTO permission_types (id, code, name, description, level)
VALUES (UUID(), 'backend.statistics.einsatzzeiten', 'Einsatzzeiten-Dashboard',
        'Zugriff auf das FMS-basierte Einsatzzeiten-Dashboard (Hilfsfrist-Analyse)', 'view');
