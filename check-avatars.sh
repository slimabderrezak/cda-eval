#!/bin/bash
# Script pour vérifier que toutes les images d'avatars existent

echo "🔍 Vérification des avatars humains..."
echo "=================================="

avatars=(
    "avatar-emma-1.png"
    "avatar-emma-2.png" 
    "avatar-emma-3.png"
    "avatar-lucas-1.png"
    "avatar-lucas-2.png"
    "avatar-lucas-3.png"
    "avatar-sophie-1.png"
    "avatar-sophie-2.png"
    "avatar-sophie-3.png"
    "avatar-antoine-1.png"
    "avatar-antoine-2.png"
    "avatar-antoine-3.png"
    "avatar-camille-1.png"
    "avatar-camille-2.png"
    "avatar-camille-3.png"
    "avatar-marie.png"
    "avatar-marie-2.png"
    "avatar-marie-3.png"
    "avatar-julien-1.png"
    "avatar-julien-2.png"
    "avatar-julien-3.png"
)

missing_count=0
total_count=${#avatars[@]}

for avatar in "${avatars[@]}"; do
    if [ -f "assets/images/$avatar" ]; then
        echo "✅ $avatar - Trouvé"
    else
        echo "❌ $avatar - MANQUANT"
        ((missing_count++))
    fi
done

echo "=================================="
echo "📊 Résumé:"
echo "   Total: $total_count avatars"
echo "   Présents: $((total_count - missing_count))"
echo "   Manquants: $missing_count"

if [ $missing_count -eq 0 ]; then
    echo "🎉 Tous les avatars sont présents!"
else
    echo "⚠️  Il manque $missing_count avatars. Consultez AVATAR_GUIDE.md"
fi